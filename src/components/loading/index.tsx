import { BeatLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <BeatLoader color="blue" loading />
    </div>
  );
};

export default Loading;
