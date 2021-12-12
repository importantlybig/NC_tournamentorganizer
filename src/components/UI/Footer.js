import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  const { language, dictionary } = useSelector((state) => state.language);

  return (
    <footer
      class="text-center text-lg-start text-white footer mt-auto "
      style={{ "background-color": "#3e4551" }}
    >
      <div class="container p-4 pb-0">
        <section class="">
          <div class="row">
            <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 class="text-uppercase">NC Tournament Organizer</h5>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae modi cum ipsam ad, illo possimus laborum ut reiciendis
                obcaecati. Ducimus, quas. Corrupti, pariatur eaque? Reiciendis
                assumenda iusto sapiente inventore animi?
              </p>
            </div>

            <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
              <h5 class="text-uppercase">Links</h5>

              <ul class="list-unstyled mb-0">
                <li>
                  <Link to="/" class="text-white">
                    {dictionary[language]["Home"]}
                  </Link>
                </li>
                <li>
                  <Link to="/tournaments" class="text-white">
                    {dictionary[language]["Find tournament"]}
                  </Link>
                </li>
                <li>
                  <Link to='/user/createtournament' class="text-white">
                    {dictionary[language]["Create tournament"]}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div
        class="text-center p-3"
        style={{ "background-color": "rgba(0, 0, 0, 0.2)" }}
      >
        © 2021 Copyright: NC Tournament Organizer
      </div>
    </footer>
  );
};

export default Footer;
