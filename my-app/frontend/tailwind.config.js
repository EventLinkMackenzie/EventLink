/** @type {import('tailwindcss').Config} */
module.exports = {
  	"content": [
    		"./src/**/*.{js,jsx,ts,tsx}"
  	],
  	"theme": {
    		"extend": {
      			"colors": {
        				"lightgray": "#d4d6e3",
        				"steelblue": "#7778b0",
        				"mediumblue": "#3d37f1",
        				"black": "#000",
        				"dimgray": "#6a6a6a",
        				"ghostwhite": "#f2f4ff",
        				"midnightblue": {
          					"100": "#272573",
          					"200": "#0a075f"
        				},
        				"whitesmoke": "#f3f3f3"
      			},
      			"spacing": {},
      			"fontFamily": {
        				"dm-sans": "'DM Sans'",
        				"roboto": "Roboto"
      			},
      			"borderRadius": {
        				"31xl": "50px",
        				"lg-5": "18.5px",
        				"lg-8": "18.8px",
        				"lgi": "19px",
        				"3xs": "10px"
      			}
    		},
    		"fontSize": {
      			"lg": "18px",
      			"9xl-4": "28.4px",
      			"xs-4": "11.4px",
      			"sm": "14px",
      			"base": "16px",
      			"21xl": "40px",
      			"3xl": "22px",
      			"9xl-5": "28.5px",
      			"inherit": "inherit"
    		}
  	},
  	"corePlugins": {
    		"preflight": false
  	}
}