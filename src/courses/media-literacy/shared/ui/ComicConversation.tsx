import type { ChatStory } from './ChatScene';
import { TowerPhoto } from './TowerPhoto';

export function ComicConversation({ story }: { story: ChatStory }) {
  const authors = [...new Set(story.messages.map((message) => message.author))];
  return (
    <figure
      className={`media-comic${story.sceneImage ? ' media-comic-with-photo' : ''}`}
      aria-label={`Комікс. Розмова наживо: ${story.name}`}
    >
      <figcaption>
        <span className="media-eyebrow">Розмова наживо</span>
        <strong>{story.name}</strong>
      </figcaption>
      <ol className="media-comic-panels">
        {story.messages.map((message, index) => {
          const right = authors.indexOf(message.author) === 1;
          return (
            <li
              className={`media-comic-panel${right ? ' media-comic-right' : ''}${message.comicArt ? ' media-comic-panel-illustrated' : ''}`}
              key={index}
            >
              <span className="media-comic-number" aria-hidden="true">
                {index + 1}
              </span>
              <div className="media-comic-balloon">
                <strong>{message.author}</strong>
                <p>{message.text}</p>
              </div>
              {message.comicArt &&
                (message.comicArt.panel === undefined ? (
                  <img
                    className="media-comic-art media-comic-illustration"
                    src={message.comicArt.src}
                    alt={message.comicArt.alt}
                  />
                ) : (
                  <div className="media-comic-strip">
                    <img
                      className="media-comic-strip-image"
                      src={message.comicArt.src}
                      alt={message.comicArt.alt}
                      style={{
                        marginLeft: message.comicArt.panel === 1 ? '-100%' : 0,
                      }}
                    />
                  </div>
                ))}
            </li>
          );
        })}
      </ol>
      {story.sceneImage === 'tower-photo' && <TowerPhoto />}
      <p className="media-muted">Вигадана навчальна розмова.</p>
    </figure>
  );
}
