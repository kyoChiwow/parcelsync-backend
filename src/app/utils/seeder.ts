/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { Area, District, Division } from "../modules/location/location.model";
import divisionsData from "../seedData/divisions.json" ;
import districsData from "../seedData/districts.json" ;
import areasData from "../seedData/upazilas.json";
import { envVars } from "../config/env";

export const seedGeography = async () => {
  try {
    console.log('⏳ Connecting to database...');
    await mongoose.connect(envVars.DB_URL);

    // 1. Clear existing data
    await Division.deleteMany({});
    await District.deleteMany({});
    await Area.deleteMany({});

    // 2. Seed Divisions
    const createdDivisions = await Division.insertMany(
      divisionsData.map((d: any) => ({ name: d.name }))
    );

    // 3. Seed Districts
    const districtPayload = districsData.map((dist: any) => {
      const parentDivision = createdDivisions.find(
        (div) => div.name === divisionsData.find((d: any) => d.id === dist.division_id)?.name
      );
      return {
        name: dist.name,
        divisionId: parentDivision?._id,
      };
    });
    const createdDistricts = await District.insertMany(districtPayload);

    // 4. Seed Areas
    const areaPayload = areasData.map((upz: any) => {
      const parentDistrict = createdDistricts.find(
        (dist) => dist.name === districsData.find((d: any) => d.id === upz.district_id)?.name
      );
      return {
        name: upz.name,
        districtId: parentDistrict?._id,
      };
    });
    await Area.insertMany(areaPayload);

    console.log('✅ Geography seeding complete!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};


seedGeography();
