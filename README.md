# Calcify ( Calculator & Unit Convertor ) 
A clean, responsive calculator with a built-in unit converter — built using vanilla JavaScript, HTML, and Bootstrap 5. Calcify pairs everyday arithmetic with quick unit conversions (length, area, weight, volume, temperature, speed, and time) in a single, distraction-free interface.

Live Demo - https://sannansarwer.github.io/js-calcify-app/

## Features
 
### Calculator
- **Standard arithmetic** — addition, subtraction, multiplication, division, and percentage
- **Live expression display** with a secondary line showing the previous calculation
- **Input validation** — blocks invalid sequences such as leading operators, consecutive operators, and multiple decimal points in a single number
- **Calculation history** — view past calculations in a modal, with the option to clear history at any time
- **Copy to clipboard** — copy the current expression and result with one click
- **Dark mode** toggle for comfortable use in low light
- **Toast-style alerts** for invalid input and status messages (powered by Bootstrap alerts)
### Unit Converter
- Convert between units across **7 categories**:
  - Length
  - Area
  - Weight
  - Volume
  - Temperature
  - Speed
  - Time
- Real-time conversion as you type or change units
- Dedicated temperature logic (Celsius, Fahrenheit, Kelvin) handled separately from the linear conversion table
 
## Tech Stack
 
| Layer      | Technology                     |
|------------|---------------------------------|
| Structure  | HTML5                          |
| Styling    | CSS3 (custom properties) + [Bootstrap 5.3.8](https://getbootstrap.com/) |
| Logic      | Vanilla JavaScript (ES6+)      |
 
No frameworks, bundlers, or dependencies to install — Bootstrap is loaded via CDN.
 
## Project Structure
 
```
Calculator/
├── index.html          # Main markup — calculator UI, history modal, converter panel
├── css/
     └── style.css        # Custom styling, theming (CSS variables), dark mode
├── js/
     ├── calculator.js    # Calculator logic, event handling, history, alerts
     └── convertor.js     # Unit converter logic
├── data/
     └── units.js         # Conversion factors and unit definitions
└── README.md
```
 
## Usage
 
**Calculator**
- Click the number and operator buttons to build an expression
- `AC` clears the entire expression
- `DEL` removes the last character
- `=` evaluates the expression
- Use the **⋮** menu (top-right) to copy the result, view history, or toggle dark mode
**Unit Converter**
1. Select a category (e.g. Length, Weight, Temperature)
2. Choose the unit to convert **from** and enter a value
3. Choose the unit to convert **to**
4. The converted result updates automatically

## How It Works
 
- **Expression evaluation:** User input is built as a string and evaluated to produce a result, with `%` translated to a division-by-100 operation before evaluation.
- **Unit conversion:** Non-temperature categories use a base-unit conversion table (`data/units.js`), where each unit stores its equivalent value in the category's base unit (e.g. meters for length). A value is converted by normalizing to the base unit, then converting to the target unit.
- **Temperature conversion:** Handled with dedicated formulas since temperature scales aren't linearly proportional to a shared base unit.
## Adding a New Unit Category
 
To extend the converter with a new category:
1. Add a new entry to the `units` object in `data/units.js`, with each unit mapped to its equivalent value in a chosen base unit
2. Add a matching `<option>` to the `#category` dropdown in `index.html`
```js
Digital: {
    Byte: 1,
    Kilobyte: 1024,
    Megabyte: 1048576,
    Gigabyte: 1073741824
}
```
 
## Known Limitations
- Calculation and conversion history are stored in memory only and reset on page reload
- Uses `eval()` for expression evaluation, which is acceptable for this simple, client-side calculator but should be replaced with a proper expression parser in production-grade or security-sensitive applications
## Roadmap
- [ ] Keyboard input support
- [ ] Persist history using `localStorage`
- [ ] Add scientific calculator mode
- [ ] Additional unit categories (data storage, currency, pressure)
## License
This project is available for personal and educational use. Add a license of your choice (e.g. MIT) if distributing publicly.
 
## Acknowledgments
Built with [Bootstrap 5](https://getbootstrap.com/) for UI components and layout.
