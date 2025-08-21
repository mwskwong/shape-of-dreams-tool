const Home = () => {
  return (
    <div>
      <button className="btn btn-primary">Get Started</button>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            alt="Shoes"
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Card Title</h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
