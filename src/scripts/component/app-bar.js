class appBar extends HTMLElement {
	constructor() {
		super();
		this.shadowDOM = this.attachShadow({mode: "open"});
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.shadowDOM.innerHTML = `
			<h2>RDF Movie</h2>
		`;
	}
}

customElements.define("app-bar", appBar);