class Node {
	constructor(tagName, children, parent) {
		this.parent = parent;
		this.tagName = tagName;
		// children is an array of node objects
		this.children = children;
	}

	/**
		Returns an array of all descendant nodes matching the selector.
		The selector could be a simple CSS selector or descendant CSS selector.
		Examples:
			selector = "p" | selector = "p div"
			return [node1, node2, ...]

		The descendant selector matches all elements that are descendants of a specified element. 
		The first simple selector within this selector represents the ancestor element—a structurally superior element, 
		such as a parent element, or the parent of a parent element, and so on. 
		The second simple selector represents the descendant element we’re trying to match
	*/
	querySelectorAll(selector){
		var selectors = selector.split(" ");
		if (selector.length == 1) {
			var arr = new Array();
			this.querySimpleSelector(selectors[0], arr);
			return arr;
		}else{
			var firstSelectNodeArr = new Array();
			this.querySimpleSelector(selectors[0], firstSelectNodeArr);

			var resultArr = new Array();
			for(var i = 0; i < firstSelectNodeArr.length; ++i){
				var arr2 = new Array();
				firstSelectNodeArr[i].querySimpleSelector(selectors[1], arr2);		
				resultArr = resultArr.concat(arr2);
			}

			// Remove duplicate nodes
			return Array.from(new Set(resultArr));
		}
	};

	querySimpleSelector(selector, arr){
		if(this.tagName == selector) {
			arr[arr.length] = this;
		}
		for(var i = 0; i < this.children.length; ++i) {
			this.children[i].querySimpleSelector(selector, arr);
		}
	};

	/**
		Add the node to the current node's parent.
		This method does not return any value.
	*/
	addSibling(node){
		if(this.parent != null){
			var childrenList = this.parent.children;
			childrenList[childrenList.length] = node;
			node.parent = this.parent;
		}
	};
};



	/**
		<body>
			<div>
			  <p>Paragraph 1 in the div.</p>
			  <p>Paragraph 2 in the div.</p>
			  <section><p>Paragraph 3 in the div.</p></section>
			  <div>
			    <p>Paragraph 1 in the div.</p>
			    <p>Paragraph 2 in the div.</p>
			    <section><p>Paragraph 3 in the div.</p></section>
			  </div>
			</div>

			<p>Paragraph 4. Not in a div.</p>
			<p>Paragraph 5. Not in a div.</p>
		</body>
	*/

	//Make the html page above in a tree with node.
	let rootNode = new Node("body", new Array(), null);

	let div1Node = new Node("div", new Array(), rootNode);
	let p1Node = new Node("p", new Array(), rootNode);
	let p2Node = new Node("p", new Array(), rootNode);
	rootNode.children[0] = div1Node;
	rootNode.children[1] = p1Node;
	rootNode.children[2] = p2Node;

	let p3Node = new Node("p", new Array(), div1Node);
	let p4Node = new Node("p", new Array(), div1Node);
	let section1Node = new Node("section", new Array(), div1Node);
	let div2Node = new Node("div", new Array(), div1Node);
	div1Node.children[0] = p3Node;
	div1Node.children[1] = p4Node;
	div1Node.children[2] = section1Node;
	div1Node.children[3] = div2Node;

	let p5Node = new Node("p", new Array(), section1Node);
	section1Node.children[0] = p5Node;

	let p6Node = new Node("p", new Array(), div2Node);
	let p7Node = new Node("p", new Array(), div2Node);
	let section2Node = new Node("section", new Array(), div2Node);
	div2Node.children[0] = p6Node;
	div2Node.children[1] = p7Node;
	div2Node.children[2] = section2Node;

	let p8Node = new Node("p", new Array(), section2Node);
	section2Node.children[0] = p8Node;

	// Test
	var pArr = rootNode.querySelectorAll("p");
	console.log("Number of <p>: " + pArr.length); // It should be 8

	let p9Node = new Node("p", new Array(), null);
	p2Node.addSibling(p9Node);
	pArr = rootNode.querySelectorAll("p");
	console.log("Number of <p>: " + pArr.length); // It should be 9

	pArr = rootNode.querySelectorAll("div p");
	console.log("Number of <p>: " + pArr.length); // It should be 6	

	pArr = rootNode.querySelectorAll("section p");
	console.log("Number of <p>: " + pArr.length); // It should be 2	

