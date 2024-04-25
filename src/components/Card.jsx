import { useNavigate } from "react-router-dom";

function Card(props) {
  const { image, title, price } = props.data.attributes;
  const {id} = props.data;
  const navigate = useNavigate();
  
  function handleRedirect() {
     navigate(`/product/${id}`)
  }
  
  return (
    <div onClick={handleRedirect} className='card w-[349px] bg-base-100 shadow-xl cursor-pointer transition duration-300 hover:shadow-2xl'>
      <figure className='px-5 pt-5'>
        <img
          src={image}
          alt='Shoes'
          className='rounded-xl object-cover h-64 w-full'
        />
      </figure>
      <div className='card-body items-center text-center'>
        <h2 className='card-title capitalize text-2xl'>{title}</h2>
        <p className='text-primary text-lg'>${price / 100}</p>
      </div>
    </div>
  );
}

export default Card;
