interface TwitterEmbedProps {
  link: string;
}

export function TwitterEmbed({ link }: TwitterEmbedProps) {
  const embedUrl = link
  .replace("//x.com/", "//twitter.com/");

  return (
    <>
    <blockquote className="twitter-tweet ">
      <a href={embedUrl}>
        </a>
        </blockquote>
       <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
    </>
  );
}