import { useEffect, useRef, useState } from "react";
import Card from "../components/Card";

function Products() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("https://strapi-store-server.onrender.com/api/products", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const searchRef = useRef();
  const [cotegory, setCategory] = useState();
  function hanldeClick(e) {
    e.preventDefault();
    let name = searchRef.current.value;

    fetch(
      `https://strapi-store-server.onrender.com/api/products?search=${name}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data.data);
      });

    fetch(
      `https://strapi-store-server.onrender.com/api/products?search=&category=${cotegory}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data.data);
      })
      .catch((err) => {
        console.log(err);
      });


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
            <select
              className="select select-bordered w-full max-w-xs select-sm"
              value={cotegory}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option disabled selected>
                all
              </option>
              <option value="tables">Tables</option>
              <option value="chairs">Chairs</option>
              <option value="chairs">Kids</option>
              <option value="chairs">Sofas</option>
              <option value="beds">Beds</option>
            </select>
          </div>
          <div className="field flex flex-col gap-1 w-1/4">
            <label className="cursor-pointer">Select Company</label>
            <select className="select select-bordered w-full max-w-xs select-sm" >
              <option disabled selected>
                all
              </option>
              <option value="modenza">Modenza</option>
              <option value="luxora">Luxora</option>
              <option value="artifex">Artifex</option>
              <option value="comfora">Comfora</option>
              <option value="hommestead">Hommestead</option>
            </select>
          </div>
          <div className="field flex flex-col gap-1 w-1/4">
            <label className="cursor-pointer">Sort By</label>
            <select className="select select-bordered w-full max-w-xs select-sm">
              <option disabled selected>
                a-z
              </option>
              <option value="">z-a</option>
              <option value="">high</option>
              <option value="">low</option>
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
            <button className="btn btn-primary w-2/4" onClick={hanldeClick}>
              SEARCH
            </button>
            <button className="btn btn-secondary w-2/4">RESET</button>
          </div>
        </div>
      </div>
      <h2 className=" mt-12 font-medium text-md mb-5">
        {featured.length} products
      </h2>
      <hr className="mb-16 " />
      <div className="featured-wrapper flex flex-wrap justify-between mt-4 gap-4 mb-20">
        {loading && (
          <span className="loading loading-ring loading-lg block mx-auto mt-20"></span>
        )}
        {!loading &&
          featured.length > 0 &&
          featured.map((el, index) => {
            return <Card key={index} data={el}></Card>;
          })}
      </div>
    </div>
  );
}

export default Products;
