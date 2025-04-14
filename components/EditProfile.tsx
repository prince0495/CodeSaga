import { useState } from "react";

type ProfileData = {
  location: string;
  education: string;
  bio: string;
  socialLinks: string[];
};

export default function EditProfile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileData>({
    location: "India",
    education: "Indian Institute of Information Technology Bhagalpur",
    bio: "",
    socialLinks: ["LinkedIn"],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof ProfileData) => {
    setProfile({ ...profile, [field]: e.target.value });
  };

  const handleSocialChange = (index: number, value: string) => {
    const updatedLinks = [...profile.socialLinks];
    updatedLinks[index] = value;
    setProfile({ ...profile, socialLinks: updatedLinks });
  };

  const addSocialLink = () => {
    setProfile({ ...profile, socialLinks: [...profile.socialLinks, ""] });
  };

  const removeSocialLink = (index: number) => {
    const updatedLinks = profile.socialLinks.filter((_, i) => i !== index);
    setProfile({ ...profile, socialLinks: updatedLinks });
  };

  return (
    <div className="w-3/12 rounded-lg my-6 ml-8 overflow-hidden bg-[#282828] flex flex-col gap-3">
      <button className="w-full px-4 h-12 flex items-center justify-center hover:cursor-pointer" onClick={() => setIsOpen(true)}>
        <div className="w-full bg-[#283a2eb5] rounded-md h-full flex items-center justify-center text-[#2cbb5d] font-semibold text-xl">
          Edit profile
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#282828] p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#bdbfc2]">Edit Profile</h2>
              <button onClick={() => setIsOpen(false)} className="text-[#bdbfc2]">✖</button>
            </div>

            <input
              type="text"
              placeholder="Location"
              value={profile.location}
              onChange={(e) => handleChange(e, "location")}
              className="w-full p-2 mb-2 bg-[#3e3e3e] text-[#bdbfc2] rounded"
            />

            <input
              type="text"
              placeholder="Education"
              value={profile.education}
              onChange={(e) => handleChange(e, "education")}
              className="w-full p-2 mb-2 bg-[#3e3e3e] text-[#bdbfc2] rounded"
            />

            <textarea
              placeholder="Bio"
              value={profile.bio}
              onChange={(e) => handleChange(e, "bio")}
              className="w-full p-2 mb-2 bg-[#3e3e3e] text-[#bdbfc2] rounded"
            ></textarea>

            <div className="mb-4">
              <label className="text-[#bdbfc2]">Social Links</label>
              {profile.socialLinks.map((link, index) => (
                <div key={index} className="flex gap-2 items-center mt-2">
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => handleSocialChange(index, e.target.value)}
                    className="w-full p-2 bg-[#3e3e3e] text-[#bdbfc2] rounded"
                  />
                  <button onClick={() => removeSocialLink(index)} className="text-red-500">✖</button>
                </div>
              ))}
              <button onClick={addSocialLink} className="text-[#2cbb5d] mt-2">+ Add Social Link</button>
            </div>

            <div className="flex justify-between">
              <button className="px-4 py-2 bg-[#2cbb5d] text-white rounded" onClick={() => setIsOpen(false)}>Save</button>
              <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => setIsOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
