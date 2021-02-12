import { Response } from 'express';
import config from '../config';

enum ResponseStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

abstract class ApiResponse {
  constructor(
    protected status: ResponseStatus,
    protected message: any,
  ) {}

  protected prepare<T extends ApiResponse>(res: Response, response: T): Response {

    switch(this.status) {
      case ResponseStatus.SUCCESS: return res.status(this.status).json(ApiResponse.sanitize(response.message));
      case ResponseStatus.BAD_REQUEST:
      case ResponseStatus.UNAUTHORIZED:
      case ResponseStatus.NOT_FOUND:
      case ResponseStatus.INTERNAL_ERROR:
      case ResponseStatus.BAD_REQUEST: return res.status(this.status).json({ err: response.message });
    }
    return res.status(this.status).json(ApiResponse.sanitize(response.message))
  }

  public send(res: Response): Response {
    return this.prepare<ApiResponse>(res, this);
  }

  private static sanitize<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T;
    Object.assign(clone, response);
    for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
    return clone;
  }
}

export class SuccessResponse<T> extends ApiResponse {
  constructor(message: T) {
    super(ResponseStatus.SUCCESS, message);
  }

  send(res: Response): Response {
    return super.prepare<SuccessResponse<T>>(res, this);
  }
}

export class InternalErrorResponse<T> extends ApiResponse {
  constructor(message = {}) {
    if(config.environment === 'production') message = 'Internal Server Error';
    super(ResponseStatus.INTERNAL_ERROR, message.toString());
  }
}

export class NotFoundResponse extends ApiResponse {
  constructor(message = 'Not Found') {
    super(ResponseStatus.NOT_FOUND, message);
  }
}

export class AuthFailureResponse extends ApiResponse {
  constructor(message = 'Authentication Failure') {
    super(ResponseStatus.UNAUTHORIZED, message);
  }
}



export class ForbiddenResponse extends ApiResponse {
  constructor(message = 'Forbidden') {
    super(ResponseStatus.FORBIDDEN, message);
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(message = 'Bad Parameters') {
    super(ResponseStatus.BAD_REQUEST, message);
  }
}



export class AccessTokenErrorResponse extends ApiResponse {
  private instruction = 'refresh_token';

  constructor(message = 'Access token invalid') {
    super( ResponseStatus.UNAUTHORIZED, message);
  }

  send(res: Response): Response {
    res.setHeader('instruction', this.instruction);
    return super.prepare<AccessTokenErrorResponse>(res, this);
  }
}