import { institutionController } from "../../controllers";
import { Institution } from "../../models/institution";

jest.mock("../../models/institution");


test("create institution", async () => {
   const data = {
    "name": "Prestigious Science University",
    "address": "P.O. Box 114, 6922 Volutpat. Ave",
    "country": "Jordan",
    "region": "Metropolitana de Santiago",
    "id": "EA8BBED7-4106-94AF-48DD-A1414E386AFB"
  }
  const req = { body: data };
  const mockJson = jest.fn((resp) => resp);
  const mockSend = jest.fn((resp: boolean) => resp);
  const res = {
    status: jest.fn((x) => ({
      json: mockJson,
      send: mockSend,
    })),
  };
    
  const mockSave = jest.fn(async () => data);
  const mockCreate = jest.fn((data) => {
    return { save: mockSave };
  });

  (Institution as any).create = mockCreate;
  await institutionController.create(req, res, null);
  expect(res.status.mock.calls.length).toBe(1);
    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(mockSend.mock.calls[0][0]).toStrictEqual(true);
});

test("read institution given valid id", async () => {
  const data = {
    "name": "Prestigious Science University",
    "address": "P.O. Box 114, 6922 Volutpat. Ave",
    "country": "Jordan",
    "region": "Metropolitana de Santiago",
    "id": "EA8BBED7-4106-94AF-48DD-A1414E386AFB"
  }
  const id = "EA8BBED7-4106-94AF-48DD-A1414E386AFB"
  const req = { query: { id: "EA8BBED7-4106-94AF-48DD-A1414E386AFB" } };
  const mockJson = jest.fn((resp) => resp);
  const res = {
    status: jest.fn((x) => ({})),
    json: mockJson,
  };
  const mockFindOne = jest.fn(async () => data);
  (Institution as any).findOne = mockFindOne;
  await institutionController.read(req, res, null);
  expect(res.json.mock.calls.length).toBe(1);
    expect(mockFindOne.mock.calls.length).toBe(1);
    expect(mockFindOne.mock.calls[0]).toEqual([{id: id}]);
});

test("read institution given invalid id", async () => {
  const id = "EA8BBED7-4106-94AF-48DD-A1414E386AFB"
  const req = { query: { id: "EA8BBED7-4106-94AF-48DD-A1414E386AFB" } };
  const mockJson = jest.fn((resp) => resp);
  const res = {
      status: jest.fn((x) => ({json: mockJson}))};
    const errorResp = {
    code: "INSTITUTION_NOT_FOUND",
    message: "Institution not found!",
  };
  const mockFindOne = jest.fn(async () => undefined);
  (Institution as any).findOne = mockFindOne;
  await institutionController.read(req, res, null);
    expect(mockFindOne.mock.calls.length).toBe(1);
    expect(mockFindOne.mock.calls[0]).toEqual([{ id: id }]);
     expect(res.status.mock.calls.length).toBe(1);
  expect(res.status.mock.calls[0][0]).toBe(404);
  expect(mockJson.mock.calls[0][0]).toStrictEqual(errorResp);
});
