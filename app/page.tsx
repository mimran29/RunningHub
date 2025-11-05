import React from 'react';
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import {events} from "@/lib/constants";

const Page = () => {
    return (
        <section>

            <h1 className="text-center mt-10">
                The Hub for Every Running Event<br/> You Can't Miss
            </h1>

            <p className="text-center mt-5">Road Marathon, Trail Running, and Fun Run, All in one Place !</p>
            <ExploreBtn/>

            <div className ="mt-20 space-y-7">
                <h3> Featured Events </h3>

                <ul className="events">
                    {events.map((event)=>(
                        <li key={event.title}>
                            <EventCard {...event} />
                        </li>
                    ))}

                </ul>
            </div>


        </section>

    );
};

export default Page;