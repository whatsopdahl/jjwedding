/*
	The restriction table is used to identify dietary restrictions.
	The following values will be used for different dietary classficiations.
		vegetarian - 0001 (1)
		gluten free - 0010 (2)
*/

INSERT INTO DietaryRestrictions (classification, value)
VALUES ('Vegetarian', 1), ('Gluten Free', 2);
