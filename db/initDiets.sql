/*
	The restriction table is used to identify dietary restrictions.
	The following values will be used for different dietary classficiations.
		vegetarian - 0001 (1)
		vegan - 0010 (2)
		gluten_free - 0100 (4)
*/

INSERT INTO DietaryRestrictions (classification, value)
VALUES ('Vegetarian', 1), ('Vegan', 2), ('Gluten Free', 4);
