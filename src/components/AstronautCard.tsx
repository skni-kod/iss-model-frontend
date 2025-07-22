function AstronautCard() {
  return (
    <div className="flex p-6 bg-gray-300 rounded-md">
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/92/Anne_C._McClain_portrait.jpg" className="w-40 h-auto object-cover shadow-xl rounded-md"/>
      <div className="flex-1 p-6">
        <h5 className="font-bold">Anne McClain</h5>
        <h6>United States</h6>
        <h6>Flight Engineer</h6>
        <h6>Crew-10 Dragon</h6>
        <h6>iss	true</h6>
        <h6>days_in_space	204</h6>
      </div>
    </div>
  );
}

export default AstronautCard;
