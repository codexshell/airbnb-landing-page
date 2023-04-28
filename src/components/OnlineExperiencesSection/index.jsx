import { Slider } from "@/components";
import "./index.css";

export function OnlineExperienceSection() {
  return (
    <section className="online-experiences-section">
      <h2 className="title">Online Experiences</h2>
      <p className="description">
        Join unique interactive activities led by one-of-a-kind hosts—all
        without leaving home.
      </p>
        <Slider />
    </section>
  );
}
