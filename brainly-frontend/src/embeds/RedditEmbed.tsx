interface RedditEmbedProps {
  link: string;
}

export function RedditEmbed({ link }: RedditEmbedProps) {
  return (
    <><blockquote className="reddit-card" ><a 
    href={link}></a>
    </blockquote>
    <script async src="//embed.redditmedia.com/widgets/platform.js" charSet="UTF-8"></script></>
  );
}