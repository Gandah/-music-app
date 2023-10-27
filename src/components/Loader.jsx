import { loader } from '../assets';

const Loader = ({ title }) => (
  <div className="w-full flex justify-center items-center flex-col">
    <img src={loader} alt="loader" className="aspect-square w-32 object-contain" />
    <h1 className="font-bold text-2xl text-white">{title || 'Retrieving data...' }</h1>
  </div>
);

export default Loader;
