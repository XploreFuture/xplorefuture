import { useEffect, useState } from "react";
import axios from "axios";

interface Ad {
  _id: string;
  imageUrl: string;
  linkUrl: string;
  position: "header" | "footer" | "content";
}

interface HorizontalAdProps {
  position: "header" | "footer" | "content";
}

const HorizontalAd: React.FC<HorizontalAdProps> = ({ position }) => {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get<Ad[]>("http://localhost:5000/api/ad/active");

        if (Array.isArray(res.data)) {
          const filteredAds = res.data.filter((ad: Ad) => ad.position === position);
          setAds(filteredAds);

          filteredAds.forEach((ad: Ad) => {
            axios.post(`http://localhost:5000/api/ad/track/view/${ad._id}`).catch(console.error);
          });
        } else {
          console.error("Unexpected API response format:", res.data);
        }
      } catch (err) {
        console.error("Failed to fetch ads", err);
      }
    };

    fetchAds();
  }, [position]);

  const handleClick = (adId: string, link: string) => {
    axios.post(`http://localhost:5000/api/ad/track/click/${adId}`).catch(console.error);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  if (ads.length === 0) return null;

  return (
    <div className="w-full flex justify-center my-4">
      {ads.map((ad: Ad) => (
        <img
          key={ad._id}
          src={ad.imageUrl}
          alt="Advertisement"
          className="w-[728px] h-[90px] object-contain rounded shadow cursor-pointer"
          onClick={() => handleClick(ad._id, ad.linkUrl)}
        />
      ))}
    </div>
  );
};

export default HorizontalAd;
