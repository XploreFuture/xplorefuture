import { useEffect, useState } from "react";
import api from "../api";

interface UserProfile {
  fullName: string;
  email: string;
  role: string;
  insta?: string;
  website?: string;
  youtube?: string;
  avatar?: string;
}

const avatarList = [
  "/avatars/male4.png",
  "/avatars/male5.png",
  "/avatars/man2.png",
  "/avatars/man1.png",
  "/avatars/female1.png",
  "/avatars/female2.png",
  "/avatars/female3.png",
  "/avatars/hero1.png",
  "/avatars/hero2.png",
];

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [insta, setInsta] = useState("");
  const [website, setWebsite] = useState("");
  const [youtube, setYoutube] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    api
      .get("/user/profile", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setInsta(res.data.insta || "");
        setWebsite(res.data.website || "");
        setYoutube(res.data.youtube || "");
        setSelectedAvatar(res.data.avatar || "");
      })
      .catch(() => alert("Not logged in"))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = async () => {
    try {
      await api.put(
        "/user/profile/update",
        { insta, website, youtube, avatar: selectedAvatar },
        { withCredentials: true }
      );
      setUser((prev) =>
        prev ? { ...prev, insta, website, youtube, avatar: selectedAvatar } : null
      );
      alert("Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile");
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!user) return <p className="p-4 text-red-600">Unauthorized. Please login.</p>;

  return (
    <div className="max-w-4xl mx-auto px-8 py-20">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Welcome, {user.fullName || user.email}
      </h2>

      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={user.avatar || "/avatars/man1.png"}
          alt="avatar"
          className="w-24 h-24 rounded-full border-4 border-gray-300 shadow"
        />
        <p className="mt-2 text-sm text-gray-600">Current Avatar</p>
      </div>

      {isEditing ? (
        <div className="space-y-5">
          <h3 className="text-xl font-semibold text-gray-700">Edit Profile</h3>

          {/* Social Inputs */}
          <div className="grid gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-600">Instagram ID</label>
              <input
                value={insta}
                onChange={(e) => setInsta(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 ring-blue-400"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-600">Website</label>
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 ring-blue-400"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-600">YouTube ID</label>
              <input
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 ring-blue-400"
              />
            </div>
          </div>

          {/* Avatar Selection */}
          <div>
            <h4 className="font-semibold text-gray-700 mt-6 mb-2">Select New Avatar</h4>
            <div className="flex flex-wrap gap-4">
              {avatarList.map((avatar, i) => (
                <img
                  key={i}
                  src={avatar}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`w-16 h-16 rounded-full cursor-pointer border-4 transition ${
                    selectedAvatar === avatar
                      ? "border-blue-600 ring ring-blue-300"
                      : "border-gray-300"
                  }`}
                  alt={`avatar-${i}`}
                />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-400 text-gray-700 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          <h3 className="text-xl font-semibold text-gray-700">Social Links</h3>
          <p>
            <strong>Instagram:</strong> {user.insta || "N/A"}
          </p>
          <p>
            <strong>Website:</strong> {user.website || "N/A"}
          </p>
          <p>
            <strong>YouTube:</strong> {user.youtube || "N/A"}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}
