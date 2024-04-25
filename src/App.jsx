import { useState, useEffect } from "react";
import { DNA } from "react-loader-spinner";

function App() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://randomuser.me/api/?page=1&results=1&seed=abc")
        .then((response) => response.json())
        .then((data) => {
          const user = data.results[0];

          const firstName = user.name.first;
          const lastName = user.name.last;
          const gender = user.gender;
          const mobile = user.cell;
          const image = user.picture.large;

          setUserData({ firstName, lastName, gender, mobile, image });
        })
        .catch((error) => console.error("Error fetching data:", error))
        .finally(() => {
          setIsLoading(false);
        });
    };

    const loaderTimer = setTimeout(() => {
      fetchData();
    }, 2000);

    return () => clearTimeout(loaderTimer);
  }, []);

  return (
    <div className="bg-gray-600 h-screen flex items-center justify-center">
      {isLoading ? (
        <DNA
          visible={true}
          height={80}
          width={80}
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      ) : (
        <div className="h-[25rem] w-[40rem] border-4 border-black bg-white flex items-center justify-center">
          <div className="border-4 border-black">
            <div className="bg-white p-8 w-[30rem] h-[15rem] shadow-md flex">
              {userData && (
                <div className="border-4 border-black flex items-center justify-center mr-8">
                  <img
                    src={userData.image}
                    alt="User"
                    className="w-32 h-32 object-cover"
                  />
                </div>
              )}
              <div className=" flex flex-col w-[14rem] ml-4">
                {userData && (
                  <>
                    <div className="p-[.5rem]">
                      <p className="text-lg font-semibold">
                        {userData.firstName} {userData.lastName}
                      </p>
                    </div>
                    <div className="p-[.5rem]">
                      <p className="text-gray-600"> {userData.gender}</p>
                    </div>
                    <div className="p-[.5rem]">
                      <p className="text-gray-600"> {userData.mobile}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
