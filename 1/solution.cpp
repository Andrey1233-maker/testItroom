/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        int duty = 0;
        ListNode* currentList = new ListNode();
        ListNode* head = currentList;
        while(l1) {
            currentList->val = l1->val;

            if(l1->next) {
                currentList->next = new ListNode();
            }
            l1 = l1->next;
            currentList = currentList->next;
        }
        currentList = head;
        while(l2) {
            currentList->val += l2->val + duty;
            duty = currentList->val / 10;
            currentList->val %= 10;
            if(l2->next && !currentList->next) {
                currentList->next = new ListNode();
            }
            l2 = l2->next;
            if(l2) {
            currentList = currentList->next;
            }
        }

        while(duty) {
            if(!currentList->next) {
                currentList->next = new ListNode();
            }
            currentList = currentList->next;
            std::cout << duty;
            currentList->val += duty;
            duty = currentList->val / 10;
            currentList->val %= 10;
        }

        return head;
    }
};