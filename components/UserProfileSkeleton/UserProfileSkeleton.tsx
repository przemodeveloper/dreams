const UserProfileSkeleton = () => {
  return (
    <div className="flex max-w-sm animate-pulse">
      <div className="w-full">
        <h3 className="h-7 bg-gray-300 rounded-full w-64 mb-4" />

        <div className="border-b-2 mb-4 w-full">
          <p className="font-secondary font-bold">Bio</p>
          <h3 className="h-5 bg-gray-300 rounded-full w-64" />
        </div>

        <div className="w-full mb-4">
          <p className="font-secondary font-bold">Dream</p>
          <ul className="font-secondary flex space-x-2">
            <li className="h-4 bg-gray-300 rounded-full w-64"></li>
          </ul>
        </div>

        <div className="w-full mb-4">
          <p className="font-secondary font-bold">Essentials</p>
          <ul className="font-secondary flex space-x-2">
            <li className="h-4 bg-gray-300 rounded-full w-64"></li>
          </ul>
        </div>

        <div className="w-full">
          <p className="font-secondary font-bold">Location</p>
          <h3 className="h-4 bg-gray-300 rounded-full w-64"></h3>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
