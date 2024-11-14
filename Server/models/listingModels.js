class Listing {
    constructor(name, size, title, price, brand, count, cond, charCount, tagCount) {

        //User Input via API call
        this.name = name;  //Product title
        this.size = size;  //Size
        this.type = title;  //Product category (shirt, pants, etc.)
        this.price = price; //Price
        this.brand = brand; //Brand
        this.count = cond; //Quantity in Stock
        this.condition = cond; //Used condition

        //Generated by methods
        this.desciption = this.generateDescrip(charCount);  //AI Generated Desciption
        this.tags = this.generateTags(tagCount); //AI Generated Hashtags
    }

    generateDescrip(charCount) {
        let description = "";

        //Use OPEN AI to generate
        return description;
    }

    generateTags(tagCount) {
        let tags = [];

        //Use OPENAi to generate

        return tags;
    }
}

class DePopListing extends Listing {
    constructor(n, s, t, p, d, b, c, cond, age) {
        super(n, s, t, p, d, b, c, cond);

        this.age = age; //Year Item was made
    }

    //Methods

}
class EbayListing extends Listing {
    constructor(n, s, t, p, d, b, c, cond, team, player, gender) {
        super(n, s, t, p, d, b, c, cond);

        this.team = team; //Team apperael
        this.player = player; //Player from team
        this.gender = gender  //Gender
    }

    //Methods

}
class GrailedListing extends Listing {
    constructor(n, s, t, p, d, b, c, cond, gender, fp) {
        super(n, s, t, p, d, b, c, cond);

        this.gender = gender  //Gender
        this.floorPrice = fp;
    }

    //Methods

}