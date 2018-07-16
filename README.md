Steps.js [![Build Status](https://travis-ci.org/imfaber/steps.js.svg?branch=master)](https://travis-ci.org/imfaber/steps.js)
============

An HTML framework to organize content into steps for a structured and orderly page view.

## Instructions

### Markup

Here's a basic example of a simple article:
```html
<html>
	<head>
        <link rel="stylesheet" href="dist/steps.min.css">
        <script src="dist/steps.min.js"></script>
	</head>
	<body>
	
	    
        <article class="stepsjs">
        
            <h1>Article title</h1>
        
            <!-- Any element below here is displayed as a step. -->
        
            <section data-label="First step">
                <h2>This is the first step</h2>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </p>
            </section>
        
            <section data-label="Second step">
                <h2>This is the second step</h2>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </p>
            </section>    
                
            <section data-label="Third step">
                <h2>This is the second step</h2>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </p>
            </section>

        </article>
	</body>
</html>
```