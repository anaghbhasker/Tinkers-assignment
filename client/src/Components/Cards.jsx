/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
function Cards() {
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    async function invoke() {
      const result = await axios.get(
        `http://localhost:4000/pokemon?page=${page}&&pagesize=${pageSize}`,
        { headers: { ownertoken: localStorage.getItem("ownertoken") } }
      );
      if (result.data.status === "success") {
        setPokemon(result.data.data);
      } else {
        navigate("/login");
      }
    }
    invoke();
  }, [page, pageSize, navigate]);

  return (
    <>
      <div className="main">
        <div>
          <h3 className="head">POKEMON</h3>
        </div>
        <div className="container">
          {pokemon.map((data) => (
            <section className="card" key={data._id}>
              <div style={{ textAlign: "center" }}>
                <img src={data?.image} alt="sampleImage" className="img" />
              </div>
              <div className="texts">
                <h1>{data?.name}</h1>
                <div>
                  <div className="attacks">
                    <h4>Attacks:</h4>
                    <h4 className="hp">Hp:70</h4>
                  </div>

                  <p>
                    {data.attacks.map((element) => (
                      <span key={element}>{element}</span>
                    ))}
                  </p>
                </div>

                <div>
                  <h4>abilities:</h4>
                  <p>
                    {data.abilities.map((element) => (
                      <span key={element}>{element},</span>
                    ))}
                  </p>
                </div>

                <button type="submit">More details..</button>
              </div>
                    
            </section>
          ))}
        </div>
      </div>
      <div className="pg">
        <div className="pagination">
          <span onClick={()=>{setPage(1)}}>1</span>
          <span onClick={()=>{setPage(2)}}>2</span>
        </div>
      </div>
    </>
  );
}

export default Cards;
