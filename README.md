# Movie Search Website

Welcome to the Movie Search website! This website allows users to search for movies and TV series using a simple search bar. The search results are displayed dynamically based on the user's query.

![Website Screenshot](https://github.com/dhimanparas20/dynamicSearch/blob/main/screenshot.png)

## Features

- Search bar in the top-middle section for typing movie or series names.
- Dynamic results that update as you type.
- Clickable movie posters that take you to the IMDb page.
- Display of movie title and type (series or movie) in each card.

## Getting Started

1. Clone this repository to your local machine.
2. Rename the `configSample.json` file to `config.json` and add your own API key from [OMDb API](http://www.omdbapi.com/) following the format:

   ```json
   {
       "apiKey": "YOUR_OMDB_API_KEY"
   }
   ```

## Technologies Used

- HTML
- CSS (including Bootstrap for styling)
- JavaScript (including jQuery for AJAX requests)

## Credits

- Movie data is provided by [OMDb API](http://www.omdbapi.com/).
- The owner of [Download Site](https://tgarchive.eu.org/).

## Contributing

Contributions are welcome! If you find any issues or want to improve the website, feel free to submit a pull request. Here are the steps to contribute:

1. Fork this repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request.

Please ensure your pull request follows our [Contribution Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
