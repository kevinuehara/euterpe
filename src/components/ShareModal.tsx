import Modal from "react-modal";
import { purple30, purple50} from "../styles/colors";


interface ExportModalProps {
  isOpen: boolean;
  time: number;
  onCloseModal: () => void;
}

const style = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: purple30
  },
};

export default function ShareModal({ isOpen, onCloseModal }: ExportModalProps) {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      contentLabel="Example Modal"
      style={style}
    >
      <h2>Hello</h2>
      <button onClick={() => console.log("close")}>close</button>
      <div>I am a modal</div>
    </Modal>
  );
}
