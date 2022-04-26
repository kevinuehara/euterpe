import { CountdownCircleTimer } from "react-countdown-circle-timer";


interface TimerProps {
  duration: number;
  play: boolean;
  onTimeUp: () => void;
  onUpdate: (remainingTime: number) => void;
}


export default function Timer(props: TimerProps) {
  return (
    <div style={{ display: 'flex', fontSize: '2.0rem', color: 'white'}}>
      <CountdownCircleTimer
        duration={props.duration}
        size={100}
        isPlaying={props.play}
        onUpdate={props.onUpdate}
        onComplete={props.onTimeUp}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[7, 5, 2, 0]}
      >
          { ({ remainingTime }) => remainingTime }
      </CountdownCircleTimer>
    </div>
  );
}
