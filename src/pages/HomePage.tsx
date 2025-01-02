import '../assets/css/pages/home.css'
import { Helmet } from 'react-helmet'
import { NavLink } from 'react-router'

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>VegetableShop | Home page</title>
      </Helmet>

      <p className="preview-text font-newsreader">
        We’re <i>farmers</i>, <i>purveyors</i>, and <i>eaters</i> of organically grown food.
      </p>

      <NavLink className="primary-green-btn shop-btn-link" to="/shop">Browse our shop</NavLink>

      <article className="main-content">
        <figure className="main-content-block">
          <img
            width="504"
            src="/images/jonathan-kemper-1HHrdIoLFpU-unsplash%201.jpg"
            alt="jonathan-kemper-1HHrdIoLFpU-unsplash 1" />
        </figure>

        <figure className="main-content-block negative-offset">
          <img
            width="780"
            src="/images/Stocksy_txp226f62b2aNe300_Medium_4582193 1.jpg"
            alt="Stocksy_txp226f62b2aNe300_Medium_4582193 1" />
          <figcaption className="main-content-text">
            <strong>Central California</strong> — The person who grew these was located in Central California and, er,
            hopefully very well-compensated.
          </figcaption>
        </figure>
      </article>

      <section className="what-we-believe">
        <div className="what-we-believe--block">
          <strong>what we believe</strong>
        </div>
        <div className="what-we-believe--block">
          <p>
            We believe in produce. Tasty produce. Produce <br /><br />

            Apples. Oranges. Limes. Lemons. Guavas. Carrots. Cucumbers. Jicamas. Cauliflowers. Brussels sprouts.
            Shallots. Japanese eggplants. Asparagus. Artichokes—Jerusalem artichokes, too. Radishes. Broccoli. Baby
            broccoli. Broccolini. Bok choy. Scallions. Ginger. Cherries. Raspberries. Cilantro. Parsley. Dill.
          </p>

          <p>
            What are we forgetting?<br /><br />

            Oh! Onions. Yams. Avocados. Lettuce. Arugula (to some, “rocket”). Persian cucumbers, in addition to
            aforementioned “normal” cucumbers. Artichokes. Zucchinis. Pumpkins. Squash (what some cultures call
            pumpkins). Sweet potatoes and potato-potatoes. Jackfruit. Monk fruit. Fruit of the Loom. Fruits of our
            labor (this website). Sorrel. Pineapple. Mango. Gooseberries. Blackberries. Tomatoes. Heirloom tomatoes.
            Beets. Chives. Corn. Endive. Escarole, which, we swear, we’re vendors of organic produce, but if you asked
            us to describe what escaroles are...
          </p>
        </div>
      </section>
    </>
  )
}

export default HomePage