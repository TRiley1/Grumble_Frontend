import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div style={{display: "flex", textAlign:"center"}}>
          <Link to="/" className="navbar-logo">
          <img className="logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADyElEQVR4nO2ZWYiOURjHf0PWXGBkTVKUspOs4QJjp8QVyi5qUqIsWcteIjfIcmW94GqINIxM1rLLlrETxj6M7dWp/1end97Pd96Z+d7vVfOvpzlzznPe8/zP9jzP+aAKVahCFMgCOgGzgJ1APvAYKAZ+SYpVly8do9tRfTOO7sBW4CnglVOe6BvdMkFgFHC+AsYnk0JgZBQEOgPn0kDAL2e1VSsd1YGVwI8ISHgSM9ZyjV0paAiciJCA55PjsqFCaAJczyAJT3IbaF5eEo2AuzEg4UnuANlhSdTSgfNiJmeAmmGIbIqB0V4SWedKoh/wOwYGe0nE2NY7FYksOSUv5nIhVWgzJgZGeo7yzwjgpONH/igIjNJBegH+JRAtZKDLRz6pz9EQA5doooz8tOo/AIeBPQogw5yVpkFEZjh+4BEwW33aAZOAooABCoDNwDDVP7PGKrW+1VxXal2gdsgzOi2IyF6Hjm+AxlYI30WDP7d0TM6BZncqMEX1H1Vf09LNVd0++YgwE2pkNwG44tBxv3S7+LZGonwQmCidBUBroA9wRCuVpbgpoT9XuiYf2aDyyhBELgURee147SUwVNme3b4eaAPUBwYB1ZQwbVF7PaCVpX9F5Grr73DgC5AHHHLwZ6+CiHx3nAWz7+tY/QYCb632ecA4rRS+oLMZ0F7lr8Bgyx+YM2Jiu89ADaXBqWz5FkTkW4glfQesARqo73zdROOBlloVs2IGo4H76tcW6KXyCrUvBFap3NqqX1xeIi8cOprb5r31v0l8DCaIyEwFnDk6Gw1V90j6N4F7Pod22Hfw0QS9dLDH6JTBZYeOp7QFBmjGTdnggOUrzLm4CCwChlh9b6mtlgxYpr5tdWOuVXsi3nNxtmacMtjheEvkKOFCB3mf1X5D9e+0zeZYbfd19dbTNf5VOjZygB4qT3Zw0LuCiEwPcUaMA0R3v13/U6FLwvuX+NqfBmwZo39V5D1t32JJqlvL+KkyaKyHNM/xkJ30nZeo5be1M8ogk48MYeVYMhKJPer9JzKCFLgQAyO9FFLo8mbcI8RZyYT8AnriiI0xMNhLIiaicEaNgIAwDpIv20IhO2YPdLes2C40zD19LSYkmpWXhL0yro8S6ZC8iqyEH9UUakdJoBRYYgWSlYYOER/q9qQJuREQKLASsrThdJqML1L6bH7WSzs6ORhk8oulwDYlYA+Uy5da4f1DtW1X2pC27ZMMiQwwmZgXmL7EHP1TZGp5lXHHpxt19JNXEAHzJjWW/wRbZXSJ0lSzv1cDXTNtWBWIOf4CzzZJ2maAcEIAAAAASUVORK5CYII="/>
          </Link>
          <div style={{marginTop : "7px"}}>
            <h1>GRUMBLE</h1>
          </div>
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                lineHeight: "0%"
              }}
            >
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE3klEQVR4nO2a24vVVRTHP+OoM17IGZ0ms9LulJfpgn9CkQpTGr2UBUGUPdVMPfQQpBARZi/VUPRST5HUS2Z3JEaILK28PNSkU1FeKKx5CJpRx/HEgu+GxZk5v9/e+5wzSfiFwznwW9+192/vtdZea+0DF/D/RQdwJ/ACsBP4ATgJjOljv78H3pdML7CA8wRtwEbgE+AsUEn8GOdj4D7pmna0A08Ax92kTgGDwGZgA7ACWCTZdv1eCdwtmd3Aacc/BvRJdlqwFhh2E/gW2AR0ZujqFPc7p+8IcAdNhK3Uq25AG3xNg3S3aIEOOP2vNMPcLgG+0QCjwONAa6MHAWYC/QoONtZeoLtRyq/UdpviIWBVifx1wDPALuCEfOcfRbGXgGURY94EHNaYhzWHuncivMRXctgie38TmCiJVH8DDwAXlYzdBXztXqa7Hp8I5rQHmF8ge6lWPEz0Ddn8DcBcfSxiPe/C9Jh2yJ7Vwnz3MntzfeY1Z06LShx10EWwpSV6H9S5c0acL0om2OXMbCD1JdY5xy7zibske7LkhauxUmeHcZ8qkb3ZBYDo0DwH+EmkxyLk35KsHZCp6BX31wjZfucvUSb2pDsnYkLsX5K/hnS0aCeNvyQiNB+UrIX/Ugc/nrCF85yD5+Jz6bg9weSPle3K/RK0aBWDKyR/lHzslA4zs5gdDOnMvUWCn0no4chJdLsVykUYMzbdeVTyHxUdaGd1ElttEYNWHYBntFo5COdPT6T8QmXN47XqmfVSaDabgt/Eu4x0zNMinFa0jMXuInN8UQ8tT0rBe+LZeZKK28T9MpG3RTyrNCfhg8wJPSeefafiWXEtVUnBBvGsbJ6EkAbcmKBwhiuyniYdYWWHpSsWK1z6NAl/6mFKmrFEnBHyMSIdlnjGosulRZMQ6ufZCQpnKx+bSIh01ZFyQjpmJfDaXJ+gIS+CuiAV+djqBN5q55c1z4ScFwmmZXE6BbcAf4i7NYG3VZzfpSMFhaYVnN2KoVTcKq41D2IREsDUlzAsL3L23PCLIs5R8a0yLMNal77nZATrxbc8rWEHYkCf+D+XOH6HZCri5GBz0YGYm6IEzHL19ZRbLgy5GjwlUnkMFqUoOUljrbTeQmothC6LyeZgYVnS6FPqRzIHmSv+uQKZc5Ip6p4UYVNMyA6FlRUvOVjgWj21cEoyOVcKLa6wsg5+Yal7IrHQ8bhWXDuTaiGcVyabinWxpa5vPhxQwR+Ly9WNrCi1r4UdrulnnFjMBA7FNh+q20Ex4XGVGmejLvwWOfJSF35Hxe1pRjvIb+FYjUG6tSr7XE/XotH2yBTHZN6u6hPv12QX12hqJzfoqlumPyq3CR2/7Qp9YQIjWlWrEVJhnJddb6yiI+BdpT1o7CO5LdOpmtgDbgXHVZ3d06DLmDZdye1wizShi6U99TaxDRdrR7z5vANcT/OwDHi9ateHdcVRF652zv9LQtumHvS4gGAvcVWjFC/WlUFFt0/9Tbp6a1UzfNSZU907MZXPhAAQTv9G3r5aar/f6R9o9t37VNfTD2Ummh3iVl9Pr2GaMEcmENKZijqGu9Ti6VVbqVNF1wz9Xq5nWyQbbq0qugXom84/DHi0K9H8tM6/cGz8r/7CUctMrEzeBnyoAmpEYXRcv4f0bJtkc+ueC+B8x78fHcKd4U6+1gAAAABJRU5ErkJggg=="/>
              <Link to="/profile">Profile</Link>
            </div>
          </li>
          <li className="navbar-item">
          <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                lineHeight: "0%"
              }}
            >
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNklEQVR4nO3aMU4DMRCF4R8KWiRofRHEwWi3gcBNOEEaxAEoAhR0tCzXcGTJkdAqGzyJgt4MfpJLS/NpdtdrywBnwAPwDWSRMQKLWltz7gUKnxt3FshYJ12hk+sfnWnORq+WbK2rQ46c3Dsiltw7IpabKB0pGQgCMaVDjphHYAmce+/Iqtb0YsEoQhLwWesqqAuvkL0wqpAp5vU3jDLEhFGHbMNc4hTShPECmWLephhPkJ0Yb5BZzCGQE+Bd4NhodSjktL547iFhHi2pz3B2BEm71hIvkBRhQUwt/1vqkNT6O68MSZY9iSokRdhYpShb3Y8ohw/PwFOE46C90iF/kCFCRwZrXaqQ3CFiyb0jYsn/tiNjnVAusqhdqvmyTFoIHOfMjVsLpFzuKphNZxRG6URBNF88WwOccZGxk5w4qAAAAABJRU5ErkJggg=="/>
              <Link to="/">Logout</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
