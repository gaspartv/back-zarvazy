import { applyDecorators } from "@nestjs/common/decorators/core/apply-decorators";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";

export function RestRepository() {
  return applyDecorators(Injectable());
}