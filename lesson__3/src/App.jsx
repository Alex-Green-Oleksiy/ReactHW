import { useState } from "react";
import "./App.css";
import Tabs from "./components/Tabs/Tabs";
import Tab from "./components/Tabs/Tab";
import LengthConverter from "./components/LengthConverter/LengthConverter";
import TemperatureDisplay from "./components/TemperatureDisplay/TemperatureDisplay";
import SpeedMonitor from "./components/SpeedMonitor/SpeedMonitor";
import WordTranslator from "./components/WordTranslator/WordTranslator";

function App() {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        {
            id: "length",
            title: "Конвертер довжини",
            description: "Перетворення сантиметрів у метри та кілометри.",
            component: <LengthConverter />,
        },
        {
            id: "temperature",
            title: "Температура",
            description: "Відображення температури зі зміною кольору фону.",
            component: <TemperatureDisplay />,
        },
        {
            id: "speed",
            title: "Монітор швидкості",
            description: "Відстеження дозволеної та поточної швидкості.",
            component: <SpeedMonitor />,
        },
        {
            id: "translator",
            title: 'Гра "Перекладач"',
            description: "Знаходження пар слів рідною та іноземною мовами.",
            component: <WordTranslator />,
        },
    ];

    return (
        <div className="app">
            <header className="app-header">
                <div className="app-header-content">
                    <h1>React ;))</h1>
                </div>
            </header>

            <main className="app-content">
                <div className="tabs-container">
                    <Tabs activeTab={activeTab} onChange={setActiveTab}>
                        {tabs.map((tab, index) => (
                            <Tab
                                key={tab.id}
                                label={`${index + 1}. ${tab.title}`}
                                index={index}
                            >
                                <div className="tab-content">
                                    <p className="tab-description">
                                        {tab.description}
                                    </p>
                                    <div className="tab-component">
                                        {tab.component}
                                    </div>
                                </div>
                            </Tab>
                        ))}
                    </Tabs>
                </div>
            </main>

            <footer className="app-footer">
                <p>© 2025. Всі права захищені.</p>
            </footer>
        </div>
    );
}

export default App;
