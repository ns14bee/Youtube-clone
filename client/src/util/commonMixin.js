export default{
    methods: {
		Capitalize(data) {
			if (data) {
				let newData = data.split(" ");
				let newString = [];
				for (let word of newData) {
					newString.push(word[0].toUpperCase() + word.slice(1));
				}
				return newString.join(" ");
			} else {
				return data;
			}
		},
		DateDiff(vidDate) {
			let newDate = new Date(vidDate);
			let DateNow = new Date();
			var seconds = Math.floor((DateNow - newDate) / 1000);
			var minutes = Math.floor(seconds / 60);
			var hours = Math.floor(minutes / 60);
			var days = Math.floor(hours / 24);
			if (days < 1) {
				if (hours < 1) {
					if (minutes < 1) {
						return `${seconds} sec`;
					} else {
						return `${minutes} min`;
					}
				} else {
					return `${hours} hours`;
				}
			} else {
				if (days <= 31) {
					return `${days} days`;
				} else {
					if (days <= 365) {
						let month = Math.floor(days / 31);
						return `${month} months`;
					} else {
						let year = Math.floor(days / 365);
						return `${year} years`;
					}
				}
			}
		},
		abbreviateNumber(value) {
			return new Intl.NumberFormat("en-US", {
				maximumFractionDigits: 1,
				notation: "compact",
				compactDisplay: "short",
			}).format(value);
		},
		UpperCase(data){
			return data.toUpperCase();
		},
		LowerCase(data){
			return data.toLowerCase();
		},
		dateConvert(value) {
			let newDate = new Date(value);
			let options = { year: "numeric", month: "long", day: "numeric" };
			return newDate.toLocaleDateString("en-US", options);
		},
	},
}