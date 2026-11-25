import { ComicConversation } from './ComicConversation';

export interface ChatReaction {
  kind: 'heart' | 'like';
  count: number;
}

export interface ChatMessage {
  author: string;
  text: string;
  time: string;
  outgoing?: boolean;
  forwarded?: boolean;
  forwardedFrom?: string;
  reactions?: ChatReaction[];
  image?: 'classroom' | 'gift' | 'game' | 'workshop';
  comicArt?: { src: string; alt: string; panel?: 0 | 1 };
}
export interface ChatStory {
  name: string;
  subtitle: string;
  date?: string;
  medium?: 'messenger' | 'in-person';
  adultAuthors?: string[];
  sceneImage?: 'tower-photo';
  messages: ChatMessage[];
}

export function ChatScene({ story }: { story: ChatStory }) {
  if (story.medium === 'in-person') return <ComicConversation story={story} />;
  return (
    <figure
      className="media-chat"
      aria-label={`Навчальний діалог: ${story.name}`}
    >
      <div className="media-chat-top">
        <span aria-hidden="true" className="media-chat-back">
          ‹
        </span>
        <span className="media-chat-avatar" aria-hidden="true">
          {story.name.slice(0, 1)}
        </span>
        <div className="media-chat-contact">
          <strong>{story.name}</strong>
          <small>{story.subtitle}</small>
        </div>
        <span className="media-chat-call" aria-hidden="true">
          ☎
        </span>
        <span aria-hidden="true">⋮</span>
      </div>
      <div className="media-chat-body">
        <span className="media-chat-date">{story.date ?? 'Сьогодні'}</span>
        {story.messages.map((message, index) => (
          <div
            className={`media-chat-row${message.outgoing ? ' outgoing' : ''}`}
            key={index}
          >
            {!message.outgoing && (
              <span className="media-chat-mini-avatar" aria-hidden="true">
                {message.author.slice(0, 1)}
              </span>
            )}
            <div className="media-chat-bubble">
              <strong className="media-chat-author">{message.author}</strong>
              {(message.forwarded || message.forwardedFrom) && (
                <span className="media-chat-forwarded">
                  ↪{' '}
                  {message.forwardedFrom
                    ? 'Переслано з каналу'
                    : 'Переслане повідомлення'}
                  {message.forwardedFrom && (
                    <strong className="media-chat-source">
                      {message.forwardedFrom}
                    </strong>
                  )}
                </span>
              )}
              {message.image === 'classroom' && (
                <img
                  className="media-chat-photo"
                  src="assets/media-literacy/learning-together.png"
                  alt="Навчальна ілюстрація: діти з учителькою розглядають планшет і вироби з кубиків"
                  loading="lazy"
                />
              )}
              {message.image === 'workshop' && (
                <img
                  className="media-chat-photo"
                  src="assets/media-literacy/workshop-photo.png"
                  alt="Данило й Соломія за столом майстерні з паперовими виробами. Соломію добре видно на знімку."
                  loading="lazy"
                />
              )}
              {message.image === 'game' && (
                <img
                  className="media-chat-photo"
                  src="assets/media-literacy/block-adventure.png"
                  alt="Ілюстрація вигаданої гри з островом із кубиків"
                  loading="lazy"
                />
              )}
              {message.image === 'gift' && (
                <div
                  className="media-gift-picture"
                  role="img"
                  aria-label="Яскрава картинка з обіцянкою подарунка: 1000 Robux"
                >
                  <span className="media-game-cube" aria-hidden="true">
                    ◇
                  </span>
                  <div>
                    <small>ПОДАРУНОК ДЛЯ ТЕБЕ</small>
                    <b>
                      1 000 <span>Robux</span>
                    </b>
                  </div>
                  <span aria-hidden="true">✦</span>
                </div>
              )}
              <p>{message.text}</p>
              <span className="media-chat-time">
                {message.time}
                {message.outgoing && <span aria-label="Прочитано"> ✓✓</span>}
              </span>
              {message.reactions && message.reactions.length > 0 && (
                <div className="media-chat-reactions">
                  {message.reactions.map((reaction) => (
                    <span
                      className={`media-chat-reaction media-chat-reaction-${reaction.kind}`}
                      key={reaction.kind}
                      role="img"
                      aria-label={`Реакції «${reaction.kind === 'heart' ? 'сердечко' : 'подобається'}»: ${reaction.count}`}
                    >
                      <span
                        className="media-chat-reaction-icon"
                        aria-hidden="true"
                      >
                        {reaction.kind === 'heart' ? '♥' : '👍'}
                      </span>
                      <span aria-hidden="true">
                        {reaction.count.toLocaleString('uk-UA')}
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="media-chat-composer" aria-hidden="true">
        <span>＋</span>
        <span>Повідомлення</span>
        <span>☺</span>
      </div>
      <figcaption>
        Навчальний діалог у стилі Viber. Імена та повідомлення вигадані.
      </figcaption>
    </figure>
  );
}
