const D_Navbar = () => {
  return (
    <div className="w-[calc(100%-16rem)] fixed ml-64 bg-white shadow-md p-4 flex justify-between items-center rounded-lg">
      <h2 className="text-xl font-semibold">Admin Dashboard</h2>
      <button className="bg-red-500 text-white px-4 py-2 rounded-md">Logout</button>
    </div>
  );
};

export default D_Navbar;
