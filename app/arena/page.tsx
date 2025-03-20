import EventCard from "../components/Arena/EventCard";
import eventData from "../components/Arena/eventData";
import Button from "../components/Button";
import Icon from "../components/Icon";
import TopAppBar from "../components/TopAppBar";

export default function Events() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="mt-32">
                <TopAppBar>
                    <Button appearance="text">
                        <Icon name="arrow_back" />
                    </Button>
                    <h1 className="text-2xl font-bold">Intania Arena</h1>
                </TopAppBar>
                {eventData.map((event, index) => (
                    <EventCard
                        key={index}
                        title={event.title}
                        description={event.description}
                        image={event.image}
                        links={event.links}
                    />
                ))}
            </div>
        </div>
    );
}