import { PaginatedResult } from "src/discovery/interfaces/paginated-result.interface";
import { SearchContentDto } from "../dto/search-content.dto";
import { Content } from "src/content/entities/content.entity";

export interface ContentProvider<T = any> {
  searchContent(input: SearchContentDto): Promise<PaginatedResult<Content>>;
}
