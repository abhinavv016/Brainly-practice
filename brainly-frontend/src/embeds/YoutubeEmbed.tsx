interface YoutubeEmbedProps{
    link: string
}
export function YoutubeEmbed({link}: YoutubeEmbedProps){

    const embedUrl = link
    .replace("watch?v=", "embed/") // safer replacement
    .replace("youtu.be/", "youtube.com/embed/")
    .replace("live/", "embed/")
    .replace(/&.*$/ ,"");

    return <iframe 
    className="w-full rounded-lg" 
    src= {embedUrl}
    title="YouTube video player" 
    frameBorder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
}