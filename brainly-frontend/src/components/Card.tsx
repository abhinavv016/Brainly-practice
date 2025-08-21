import { RedditEmbed } from "../embeds/RedditEmbed";
import { TwitterEmbed } from "../embeds/TwitterEmbed";
import { YoutubeEmbed } from "../embeds/YoutubeEmbed";
import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { YouTubeIcon } from "../icons/YoutubeIcon";
import { RedditIcon } from "../icons/RedditIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "reddit";
  _id?: string;
}

export function Card({ title, link, type, _id }: CardProps) {
  const { refresh } = useContent() || {};

  async function handleDelete() {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: { 
            "Authorization": `Bearer ${token}` 
        },
        //@ts-ignore
        data: { "contentId": _id },
      });
      refresh();
    } catch (error) {
      console.error("Error deleting content: ", error);
    }
  }

  return (
    <div>
      <div className="p-6 bg-white rounded-md border border-gray-300 max-w-96">
        <div className="flex justify-between">
          <div className="flex items-center text-md">
            <div className="text-gray-500 pr-3">
              {type === "youtube" && <YouTubeIcon />}
              {type === "reddit" && <RedditIcon />}
              {type === "twitter" && <TwitterIcon />}
            </div>
            <div className="font-bold">{title}</div>
          </div>
          <div className="flex items-center text-gray-500">
            <div className="pr-4">
              <a href={link} target="_blank">
                <ShareIcon />
              </a>
            </div>
            <div
              className="cursor-pointer"
              onClick={handleDelete}
              aria-label="Delete"
            >
              <DeleteIcon />
            </div>
          </div>
        </div>
        <div className="pt-5 rounded-md">
          {type === "youtube" && <YoutubeEmbed link={link} />}
          {type === "twitter" && <TwitterEmbed link={link} />}
          {type === "reddit" && <RedditEmbed link={link} />}
        </div>
      </div>
    </div>
  );
}