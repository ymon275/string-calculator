import { Add } from "../src/components/calculator";

describe("String Calculator", () => {
  describe("When an empty string is inputed", () => {
    it("should return zero", () => {
      expect(Add("")).toBe(0);
    });
  });
  describe("When one number is inputed", () => {
    it("should return that number", () => {
      expect(Add("3")).toBe(3);
      expect(Add("20")).toBe(20);
    });
  });
  describe("When two numbers, separated by a comma, are inputed", () => {
    it("should return the sum of the two numbers", () => {
      expect(Add("3,7")).toBe(10);
      expect(Add("14,26")).toBe(40);
    });
  });
  describe("When an unknown amount of numbers are inputed", () => {
    it("should return the sum of all the numbers", () => {
      expect(Add("1,2,3,4,5")).toBe(15);
      expect(Add("27,89,6,13")).toBe(135);
      expect(Add("8,3,0,1,4,7,2,3,8,10")).toBe(46);
    });
  });
  describe("When a number is separated by a new line rather than a comma", () => {
    it("should return the sum of all the numbers", () => {
      expect(Add("1,2\n3,4\n5")).toBe(15);
      expect(Add("1\n2")).toBe(3);
      expect(Add("1, \n6,8")).not.toBe(15);
    });
  });
  describe("When a delimiter option is added '//[delimiter]\\n[numbers]' where //;\\n1;2 returns 3", () => {
    it("should return the sum of all the numbers", () => {
      expect(Add("//[;]\n1;2")).toBe(3);
      expect(Add("//[-]\n12-15-3")).toBe(30);
      expect(Add("//[e]\n2e7e4")).toBe(13);
    });
  });
  describe("When a negative number is in the input", () => {
    it("should throw an exception with the inputed negative numbers", () => {
      expect(() => Add("1,-2")).toThrow("negatives not allowed -2");
      expect(() => Add("//[;]\n3;6;-17")).toThrow("negatives not allowed -17");
      expect(() => Add("1,-2,3,-5,-13")).toThrow(
        "negatives not allowed -2,-5,-13"
      );
      expect(() => Add("//[;]\n-3;6;-17;-9")).toThrow(
        "negatives not allowed -3,-17,-9"
      );
      expect(() => Add("4,-2\n-3")).toThrow("negatives not allowed -2,-3");
    });
  });
  describe("When a number is greater than 1000", () => {
    it("should ignore all numbers greater than 1000", () => {
      expect(Add("1001,2")).toBe(2);
      expect(Add("3,5,2000,800,6052,92")).toBe(900);
      expect(Add("//[**][%]\n200**1001%20%83**2000")).toBe(303);
      expect(Add("7\n200\n10001\n89")).toBe(296);
    });
  });
  describe("When there are delimiters with multiple character lengths", () => {
    it("should add all the numbers", () => {
      expect(Add("//[swift]\n123swift86swift100swift3")).toBe(312);
      expect(Add("//[ymon275]\n63ymon2758ymon275666ymon27569ymon275420")).toBe(
        1226
      );
    });
  });
  describe("When there are multiple delimiters with multiple characters", () => {
    it("should add all numbers", () => {
      expect(Add("//[.][:p][276]\n5327627.83:p256:p100.327615:p9")).toBe(546);
      expect(Add("//[?][+3=][xyz]\n287+3=52xyz8?638?999xyz2+3=58")).toBe(2044);
      expect(Add("//[Y][---][$$$]\n27$$$82Y71$$$230---753Y64")).toBe(1227);
    });
  });
});
