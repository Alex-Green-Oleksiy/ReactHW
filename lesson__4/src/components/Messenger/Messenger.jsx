import { useState } from 'react';
import styles from './Messenger.module.scss';

function Messenger() {
    const [messages, setMessages] = useState([
        { text: 'Мені скучно...', likes: 0, dislikes: 0 },
        { text: 'Лови жарт.', likes: 0, dislikes: 0 },
        { text: 'Давай.', likes: 0, dislikes: 0 },

        { text: 'Чому програмісти не бояться темряви?', likes: 0, dislikes: 0 },
        { text: 'Ну і ?', likes: 0, dislikes: 0 },

        { text: 'Бо після смерті все одно буде чорний екран консолі.', likes: 0, dislikes: 100 },
        { text: 'Я піду краще, попрацюю.', likes: 2, dislikes: 0 },
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() === '') return;
        setMessages([...messages, { text: input, likes: 0, dislikes: 0 }]);
        setInput('');
    };

    const handleLike = (idx, delta) => {
        setMessages(
            messages.map((msg, i) =>
                i === idx ? { ...msg, likes: Math.max(0, msg.likes + delta) } : msg
            )
        );
    };

    const handleDislike = (idx, delta) => {
        setMessages(
            messages.map((msg, i) =>
                i === idx ? { ...msg, dislikes: Math.max(0, msg.dislikes + delta) } : msg
            )
        );
    };

    return (
        <div className={styles.messengerBox}>
            <div className={styles.messagesList}>
                {messages.map((msg, idx) => (
                    <div key={idx} className={styles.messageRow}>
                        <span className={styles.msgText}>{msg.text}</span>
                        <div className={styles.reactionsRow}>
                            <button
                                className={styles.reactionBtn}
                                onClick={() => handleLike(idx, 1)}
                            >
                                <span style={{ position: 'relative', display: 'inline-block' }}>
                                    <span role="img" aria-label="like">
                                        👍
                                    </span>
                                    <span className={styles.likesNum}>{msg.likes}</span>
                                </span>
                            </button>
                            <button
                                className={styles.reactionBtn}
                                onClick={() => handleDislike(idx, 1)}
                            >
                                <span style={{ position: 'relative', display: 'inline-block' }}>
                                    <span role="img" aria-label="dislike">
                                        👎
                                    </span>
                                    <span className={styles.dislikesNum}>{msg.dislikes}</span>
                                </span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.msgInputRow}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Введіть ваше повідомлення..."
                />
                <button onClick={handleSend}>послати</button>
            </div>
        </div>
    );
}

export default Messenger;
