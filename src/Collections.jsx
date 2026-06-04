export default function Collections() {
  return (
    <section className="collections">
      <h2>Explore Collections</h2>

      <div className="grid">

        <div
          className="card large"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000')"
          }}
        >
          <h3>Streetwear</h3>
        </div>

        <div
          className="card luxury"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000')"
          }}
        >
          <h3>Luxury</h3>
        </div>

        <div
          className="card arrivals"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000')"
          }}
        >
          <h3>New Arrivals</h3>
        </div>

        <div
          className="card wide"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1000')"
          }}
        >
          <h3>Essentials</h3>
        </div>

      </div>
    </section>
  );
}