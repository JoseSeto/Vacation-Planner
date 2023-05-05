# **Vacation Planner**

## **User Story**

    As a weekend employee with expiring vacation days, 
    I want to lookup locations where to spend my weekend at
    So I can setup a rough intineray for the weekend

## **Acceptance Criteria**

    When the page loads
    Then information will be displayed for current location
    When a location input is given
    Then the map will show the location and the weather for the weekend will be displayed
    And the previous search results will be shown below
    When the planner option is selected
    Then the planner page will be loaded
    When the save button is clicked
    Then the contents of the box is saved locally
    When the reset button is clicked
    Then the content of the box is cleared
    When the return button is clicked
    Then the home page will be loaded 

## **Description**

### The website is meant to be used to plan a quick 3-day weekend trip. It shows the current location in the beginning then from user input of the wanted destination will display the weather for those days and pin point location of said destination. There is also an optional planner that will help the user make note of any plans they would like to do on the vacation.

## **Getting Started**

### Start by searching a city name and the map will update to show the city. If Friday, Saturday, or Sundar are within the five day forecast, the weather will be displayed in the corresponding boxex. If no data is found for those three days, nothing will be displayed. You can also click on the history buttons to bring up previous sarche results. In the header there is a button to take you to a planner section where you can add events you would like to do. This has a limit of 10 events per day, if you go over the 10, it will reset the first event made.

### Dependencies

* MacOS
* Windows 10

### Installing

[Repository](https://github.com/JoseSeto/Vacation-Planner)

### Executing program

[Pages](https://joseseto.github.io/Vacation-Planner/)

## Author(s)

* Jose Seto - Javascript
* Giovanne Villanueva-Hernandez - HTML
* Kamauliola Agunat - Javascript
* Rebecca Fregoso - HTML
* Karina Valencia - CSS

## Version History

* 0.1
    * Initial Release

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

* APIs
    * [Google Maps](https://developers.google.com/maps/)

    * [Open Weather Map](https://openweathermap.org/api)

* CSS Framework
    * [Tailwind](https://tailwindcss.com/)


## Deployed Program

![Home Screen](https://github.com/JoseSeto/Vacation-Planner/blob/Readme/assets/Homepage.png)


![Planner](https://github.com/JoseSeto/Vacation-Planner/blob/Readme/assets/Planner.png)
