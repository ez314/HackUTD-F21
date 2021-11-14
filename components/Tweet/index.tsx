import LikeIcon from "../icon/LikeIcon";
import RetweetIcon from "../icon/RetweetIcon";
import style from './style.module.css';

interface TweetProps {
  photo: string;
  name: string;
  handle: string;
  content: string;
  likes: number;
  retweets: number;
  date: string;
}
export default function Tweet({ photo, name, handle, content, likes, retweets, date }: TweetProps) {
  return (
    <div className={`flex flex-col w-64 m-auto rounded-xl bg-custom-gray-2 text-custom-gray-4 p-2 cursor-pointer hover:scale-110 transition ${style.tweet}`}>
      <div className="flex flex-row items-center justify-start w-full">
        <img src={photo} className="w-10 h-10 rounded-full mx-3" />
        <div className="flex flex-col text-sm">
          <div className="m-0">{name}</div>
          <div className="text-xs">{handle}</div>
        </div>
      </div>
      <div className="text-xs m-3">{content}</div>
      <div className="flex flex-row items-center w-full">
        <div className="flex flex-row items-center w-min mx-3">
          <LikeIcon className="w-4 h-4" />
          <div className="text-xs ml-1">{likes}</div>
        </div>
        <div className="flex flex-row items-center w-min mx-3">
          <RetweetIcon className="w-4 h-4" />
          <div className="text-xs ml-1">{retweets}</div>
        </div>
      </div>
    </div>
  )
}