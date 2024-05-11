import { Box, Card, Container, Grid } from "@mui/material";
import InfoPageImage1 from "../../assets/InfoPage-img1.png";
import "./InfoPage.scss";

type Props = {};
const InfoPage = (props: Props) => {
  return (
    <Box className="info-page">
      <Container maxWidth="lg">
        <h1 className="info-page__title">
          Pioneering research on the path to AGI
        </h1>

        <p className="info-page__text">
          We believe our research will eventually lead to artificial general
          intelligence, a system that can solve human-level problems. Building
          safe and beneficial AGI is our mission.
        </p>

        <br />

        <img
          className="info-page__img"
          src={InfoPageImage1}
          alt="InfoPageImage1"
        />

        <br />
        <br />
        <br />
        <br />

        <p className="info-page__text">
          “Safely aligning powerful AI systems is one of the most important
          unsolved problems for our mission. Techniques like learning from human
          feedback are helping us get closer, and we are actively researching
          new techniques to help us fill the gaps.”
        </p>

        <p className="info-page__subText2">Josh Achiam, Researcher at OpenAI</p>

        <br />
        <br />
        <br />
        <br />

        <p className="info-page__subTitle">Text</p>

        <p className="info-page__subText">
          Our text models are advanced language processing tools that can
          generate, classify, and summarize text with high levels of coherence
          and accuracy.
        </p>

        <br />
        <br />
        <br />
        <br />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Card className="info-page__card1">
              <h4 className="card__title">
                Aligning language models to follow instructions
              </h4>

              <p className="card__text">
                We are actively seeking talented individuals to join our team.
                Explore featured roles or view all open roles.
              </p>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Card className="info-page__card2">
              <h4 className="card__title">
                Summarizing books with humans feedback
              </h4>

              <p className="card__text">
                We`ve trainded our models to summarize books with humans
                feedback.
              </p>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Card className="info-page__card3">
              <h4 className="card__title">
                Language models are few-shot learners
              </h4>

              <p className="card__text">
                We trained GPT-3, an autoregressive language model with 175
                billion parameters.
              </p>
            </Card>
          </Grid>
        </Grid>

        <br />
        <br />
        <br />
        <br />

        <p className="info-page__subTitle">Image</p>

        <p className="info-page__subText">
          Our research on generative modeling for images has led to
          representation models like CLIP, which makes a map between text and
          images that an AI can read, and DALL-E, a tool for creating vivid
          images from text descriptions.
        </p>

        <br />
        <br />
        <br />
        <br />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Card className="info-page__card4">
              <h4 className="card__title">
                Hierachial text-conditioanl image generation wi
              </h4>

              <p className="card__text">
                We show that our models can generate text conditioned images.
              </p>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Card className="info-page__card5">
              <h4 className="card__title">
                DALLE: Creating images from text descriptions
              </h4>

              <p className="card__text">
                We`ve trainded a neural network called DALLE that creates images
                from text captions for a wid range of concepts expressible in
                natural language.
              </p>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Card className="info-page__card6">
              <h4 className="card__title">CLIP: Connecting text and images</h4>

              <p className="card__text">
                We`re introducing a neural network called CLIP which efficienly
                learns visual concepts from natural language supervision.
              </p>
            </Card>
          </Grid>
        </Grid>

        <br />
        <br />
        <br />
        <br />
      </Container>
    </Box>
  );
};
export default InfoPage;
