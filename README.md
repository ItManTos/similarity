![itmanTos](favicon.ico) AngularJS Movable 
===================
Similarity JavaScript Library for following algorithms: LCS - Longest Common Substring, TCC - Total Common Chars, half-half and smart one.

Demo
-----------
See http://itmanTos.github.io/similarity

Methods
-----------
Similarity.getLcsRate(string1, string2)

returns similarity based on Longest Common Substring in both two strings


Similarity.getTccRate(string1, string2)

returns similarity based on common chars in both two strings


Similarity.get(string1, string2[, rate1, rate2])

returns similarity based on common chars/longest common substring in both two strings


Similarity.getSmartRate(string1, string2[, rate1, rate2, rate3])

returns similarity based on common chars/comon substrings/longest common substring in both two strings
If need get high precise result more fast, use get function instead.
