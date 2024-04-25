import { useEffect, useRef, useState } from "react";
import Card from "../components/Card";

function Products() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true);
    fetch("https://strapi-store-server.onrender.com/api/products", {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => {setFeatured(data.data)})
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const searchRef = useRef()

  function hanldecl (e) {
    e.preventDefault();
    let name = searchRef.current.value

      fetch(`https://strapi-store-server.onrender.com/api/products?search=${name}`)
      .then(res => res.json())
      .then(data => {
        setFeatured(data.data)
      })

    
  }
  return (
    <div className="w-4/5 mx-auto mt-20">
      <div className="filter p-4 bg-primary-content rounded-md">
        <div className="filter-top flex justify-between gap-3">
          <div className="field flex flex-col gap-1 w-1/4">
            <label htmlFor="search" className="cursor-pointer">
              Serarch Products
            </label>
            <input
              type="search"
              id="search"
              className="input input-bordered w-full max-w-xs input-sm"
              ref={searchRef}
            />
          </div>
          <div className="field flex flex-col gap-1 w-1/4">
            <label className="cursor-pointer">Select Category</label>
            <select className="select select-bordered w-full max-w-xs select-sm">
              <option disabled selected>
                all
              </option>
              <option>Tables</option>
              <option>Chairs</option>
              <option>Kids</option>
              <option>Sofas</option>
              <option>Beds</option>
            </select>
          </div>
          <div className="field flex flex-col gap-1 w-1/4">
            <label className="cursor-pointer">Select Company</label>
            <select className="select select-bordered w-full max-w-xs select-sm">
              <option disabled selected>
                all
              </option>
              <option>Modenza</option>
              <option>Luxora</option>
              <option>Artifex</option>
              <option>Comfora</option>
              <option>Hommestead</option>
            </select>
          </div>
          <div className="field flex flex-col gap-1 w-1/4">
            <label className="cursor-pointer">Sort By</label>
            <select className="select select-bordered w-full max-w-xs select-sm">
              <option disabled selected>
                a-z
              </option>
              <option>z-a</option>
              <option>high</option>
              <option>low</option>
            </select>
          </div>
        </div>
        <div className="filter-bottom mt-8 flex justify-between gap-3 items-center">
          <div className="range-block">
            <input
              type="range"
              min={0}
              max="100"
              value="40"
              className="range range-primary"
            />
          </div>
          <div className="check w-1/4 ">
            <div className="form-control ">
              <label className="label cursor-pointer flex flex-col gap-1 ">
                <span className="label-text">Free shipping</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary"
                />
              </label>
            </div>
          </div>
          <div className="buttons w-2/4 flex justify-between gap-3">
          <button className="btn btn-primary w-2/4" onClick={hanldecl}>SEARCH</button>
            <button className="btn btn-secondary w-2/4">RESET</button> 
          </div>
        </div>
      </div>
      <h2 className=' mt-12 font-medium text-md mb-5'>{featured.length} products</h2>
        <hr className="mb-16 "/>
      <div className="featured-wrapper flex flex-wrap justify-between mt-4 gap-4 mb-20">
        
          {
            loading && <span className="loading loading-ring loading-lg block mx-auto mt-20"></span>
          }
          {
            !loading && featured.length > 0 && featured.map((el, index) => {
              return (<Card key={index} data = {el}></Card>);
            })
          }
        
        </div>
    </div>
  );
}

export default Products;
